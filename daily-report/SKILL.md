---
name: daily-report
description: Report what needs attention in Demostore today - products out of stock or running low, orders stuck or paid but not shipped, failed payments, products no shopper can reach, reviews waiting for approval. Use when the user asks how the shop is doing, what needs doing today, or runs /daily-report.
---

# Daily shop report

Call `solution25-daily-shop-check` and report on Demostore. When more than one Shopware
shop is connected, use the one whose `data.shop.name` is Demostore.

Write the report yourself, in your own words:

- Lead with what needs attention most. The signals come back worst first.
- For each one give the count, say what it means for the shop, and name two or three
  of the records behind it so I recognise them.
- Say what you would do about each, then end with the follow-ups I can pick from.
- Read `warnings` first and pass on anything that was skipped or only partly listed.

This is read-only. If a fix is warranted, tell me what you would do and wait for me to
ask for it.
