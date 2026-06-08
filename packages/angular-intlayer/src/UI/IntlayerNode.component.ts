import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  inject,
  type OnChanges,
  type SimpleChanges,
  type Type,
  ViewContainerRef,
} from '@angular/core';

/**
 * A transparent host element that renders Intlayer content nodes.
 *
 * `display: contents` makes the `<intlayer-node>` element invisible in the
 * layout — its children appear as if they were direct children of the parent,
 * so placing this component inside `<h1>`, `<p>`, etc. does not break the
 * document structure.
 *
 * ### Usage
 * ```html
 * <h1><intlayer-node [node]="content().title"></intlayer-node></h1>
 * ```
 */
@Component({
  selector: 'intlayer-node',
  standalone: true,
  // The ng-content slot is the anchor point for ViewContainerRef.
  // Wrapping text renders directly inside this host thanks to display:contents.
  template: `<ng-container #anchor></ng-container>`,
  // display:contents collapses the host box so it is layout-transparent.
  styles: [`:host { display: contents; }`],
})
export class IntlayerNodeComponent implements OnChanges {
  @Input() node: any;

  private vcr = inject(ViewContainerRef);
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['node']) {
      this.render();
    }
  }

  private render() {
    // Clear previously created views / text nodes
    this.vcr.clear();
    const host = this.elRef.nativeElement;
    // Remove any raw text nodes we injected directly on previous renders
    host.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) n.parentNode?.removeChild(n);
    });

    if (!this.node) return;

    // The node returned by the Angular plugin is a Proxy whose `.children`
    // property is a function returning component info (editor on) or the raw
    // value (editor off).
    const nodeInfo =
      typeof this.node?.children === 'function'
        ? this.node.children()
        : this.node;

    if (nodeInfo?.component && typeof nodeInfo.component !== 'string') {
      // ── Editor enabled path: create the ContentSelectorWrapper component ──
      const componentRef = this.vcr.createComponent(
        nodeInfo.component as Type<any>
      );

      if (nodeInfo.props) {
        for (const [key, value] of Object.entries(nodeInfo.props)) {
          (componentRef.instance as any)[key] = value;
        }
      }

      if (nodeInfo.children) {
        const content = nodeInfo.children;
        if (typeof content === 'string' || typeof content === 'number') {
          componentRef.location.nativeElement.appendChild(
            document.createTextNode(String(content))
          );
        }
      }

      this.cdr.markForCheck();
    } else {
      // ── Editor disabled path: render plain text inside the host ──────────
      const text =
        this.node?.value ?? this.node?.toString?.() ?? String(this.node);
      // Append a text node directly inside the host element.
      // Because the host has `display: contents`, this text is layout-wise a
      // direct child of the surrounding element (e.g. <h1>).
      host.appendChild(document.createTextNode(text));
    }
  }
}
