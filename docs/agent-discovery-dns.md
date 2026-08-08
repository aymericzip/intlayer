# Agent discovery over DNS (DNS-AID + DNSSEC)

Everything else in the agent-discovery work ships as code. This part cannot:
publishing DNS-AID records and enabling DNSSEC are operations on the Cloudflare
zone and at the registrar. This document is the runbook.

## Current state (verified 2026-08-08)

```sh
dig +short _index._agents.intlayer.org HTTPS   # → Cloudflare ECH record
dig +short intlayer.org DNSKEY                 # → empty
```

Two findings, and the first is a trap:

1. **The DNS-AID records that a scanner "finds" are not real.** `intlayer.org`
   is served by Cloudflare with a proxied wildcard, so _every_ label resolves.
   A control query proves it:

   ```sh
   dig +short _thisdoesnotexist12345._agents.intlayer.org HTTPS
   # → the same Cloudflare answer
   ```

   The HTTPS record returned is Cloudflare's generic `alpn="h3,h2"` + ECH
   record, which carries no DNS-AID `endpoint` parameter. Any audit reporting
   "DNS-AID records found" against this zone is reporting a false positive.

2. **DNSSEC is genuinely off.** `DNSKEY` is empty, which is why the same audit
   adds "but DNSSEC was not validated". This part of the finding is real.

## What to publish

DNS-AID uses ServiceMode SVCB records under `_<service>._agents.<domain>`. The
services worth advertising for Intlayer are the hosted MCP server and an index
pointing at the HTTP discovery documents the site now serves.

```dns
; Hosted MCP server — Streamable HTTP on the origin root
_mcp._agents.intlayer.org.   3600 IN SVCB 1 mcp.intlayer.org. (
                                      alpn="h2,h3"
                                      port=443
                                      endpoint="https://mcp.intlayer.org/" )

; Entry point for agents that only know the brand domain
_index._agents.intlayer.org. 3600 IN SVCB 1 intlayer.org. (
                                      alpn="h2,h3"
                                      port=443
                                      endpoint="https://intlayer.org/.well-known/api-catalog" )
```

Notes:

- Use **ServiceMode** (priority ≥ 1), not AliasMode (priority 0) — AliasMode
  cannot carry the `endpoint` parameter.
- `endpoint` is a DNS-AID key. Cloudflare's UI may require entering SVCB values
  through the "custom" record type; the API accepts the full record body.
- Do **not** advertise `_a2a._agents` unless an A2A agent card is actually
  served. There is none today.
- The records must be **DNS-only (grey cloud)**, not proxied. A proxied record
  is rewritten by Cloudflare and the `endpoint` parameter is lost — which is
  exactly the wildcard behaviour that produced the false positive above.

## Enabling DNSSEC

1. Cloudflare dashboard → `intlayer.org` → **DNS** → **Settings** → **DNSSEC** →
   _Enable DNSSEC_. Cloudflare returns a DS record.
2. Copy the DS record (key tag, algorithm, digest type, digest) to the
   **registrar** holding `intlayer.org`. The chain of trust is only established
   once the parent zone publishes the DS — enabling it in Cloudflare alone
   changes nothing that a validating resolver can see.
3. Wait for the parent zone TTL, then verify:

   ```sh
   dig +short intlayer.org DNSKEY            # expect key material
   dig +short intlayer.org DS @1.1.1.1       # expect the DS from the parent
   dig +dnssec intlayer.org SOA @1.1.1.1     # expect the `ad` flag set
   ```

   Or use https://dnsviz.net/d/intlayer.org/dnssec/ for a full chain view.

## Verifying the DNS-AID records

```sh
dig +short _mcp._agents.intlayer.org SVCB
dig +short _index._agents.intlayer.org SVCB
```

A correct answer shows the priority, target and the `endpoint=` parameter. If
the reply looks identical to a random non-existent label, the wildcard is still
answering and the record has not actually been created.

## Order of operations

Enable DNSSEC **first**. Publishing discovery records into an unsigned zone
means a validating resolver cannot distinguish them from a spoofed answer, which
is the whole point of the audit item.
