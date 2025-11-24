---
createdAt: 2024-08-11
updatedAt: 2025-11-22
title: Intlayer कमांड डिबग करें
description: जानें कि Intlayer CLI समस्याओं को कैसे डिबग और ट्रबलशूट करें।
keywords:
  - डिबग
  - ट्रबलशूट
  - CLI
  - Intlayer
slugs:
  - doc
  - concept
  - cli
  - debug
---

# Intlayer कमांड डिबग करें

## 1. **सुनिश्चित करें कि आप नवीनतम संस्करण का उपयोग कर रहे हैं**

चलाएँ:

```bash
npx intlayer --version                  # वर्तमान लोकल Intlayer संस्करण
npx intlayer@latest --version           # वर्तमान नवीनतम Intlayer संस्करण
```

## 2. **जांचें कि कमांड पंजीकृत है या नहीं**

आप जांच सकते हैं:

```bash
npx intlayer --help                     # उपलब्ध कमांड और उपयोग जानकारी की सूची दिखाता है
npx intlayer dictionary build --help    # किसी कमांड के लिए उपलब्ध विकल्पों की सूची दिखाता है
```

## 3. **अपने टर्मिनल को पुनः प्रारंभ करें**

कभी-कभी नए कमांड को पहचानने के लिए टर्मिनल को पुनः प्रारंभ करना आवश्यक होता है।

## 4. **npx कैश साफ़ करें (यदि आप पुराने संस्करण में फंसे हुए हैं)**

```bash
npx clear-npx-cache
```
