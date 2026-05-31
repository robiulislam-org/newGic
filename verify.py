#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, os
sys.stdout.reconfigure(encoding='utf-8')

HTML_FILE = r"d:\GIC website\index.html"
JS_FILE   = r"d:\GIC website\free-courses.js"

with open(HTML_FILE, 'r', encoding='utf-8') as f:
    html = f.read()

print(f"Lines: {html.count(chr(10))} | Chars: {len(html)}")
marker = 'id="page-free-courses"'
idx = html.find(marker)
print(f"page-free-courses at index: {idx}")
print(repr(html[idx:idx+300]))
