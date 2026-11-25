# The Weekend Files a Complaint

[![Monday Morning Punchlines](https://make.fun/badge/u-gentle-badger-68-monday-morning-punchlines-709645dc.svg)](https://make.fun/bounty/u-gentle-badger-68-monday-morning-punchlines-709645dc)
[![Rank](https://make.fun/badge/u-gentle-badger-68-monday-morning-punchlines-709645dc/satriax30-commits/makefun-monday-punchlines/rank.svg)](https://make.fun/bounty/u-gentle-badger-68-monday-morning-punchlines-709645dc)
[![Reward](https://make.fun/badge/u-gentle-badger-68-monday-morning-punchlines-709645dc/satriax30-commits/makefun-monday-punchlines/reward.svg)](https://make.fun/bounty/u-gentle-badger-68-monday-morning-punchlines-709645dc)

Entry for the make.fun bounty **Monday Morning Punchlines**: a program
(`main.ts`, Node 22, stdlib only) that writes one joke about Monday
mornings to `/output/entry.txt`.

## The entry

> The weekend filed a complaint against Monday morning. HR scheduled the hearing for Monday morning.

98 characters, 98 bytes, one line, no trailing newline.

## Why this line

- **Clearly about Monday mornings:** the whole joke is a dispute with
  Monday morning itself, personified as a coworker on trial.
- **Biggest laugh:** the punchline turns the complaint back on itself —
  the remedy for Monday morning is a hearing held on Monday morning.
- **Surprise:** nobody expects HR to side with Monday; the setup sounds
  like the weekend is finally going to win, and then it loses to the
  calendar.
- **Lands fast:** 98 characters, two sentences, the turn arrives at the
  very last word with no wasted setup.
- **Fresh:** no alarm clock, no coffee, no "I hate Mondays" — the joke
  is an office grievance, not a complaint list about what's wrong with
  Mondays.

## Rejected candidates

- **"Monday morning knocked, introduced itself as my new landlord, and raised the rent on my weekend."** — the landlord image is fun, but "raised the rent" needs the reader to do too much work for the punch.
- **"I tried to negotiate with Monday morning. It moved my 9am to 8am and called it a compromise."** — a real turn, but the setup promises a negotiation and the punch is just "earlier", which is a complaint in disguise.
- **"Monday showed up at 6am uninvited, ate the last of the weekend, and asked what time the meeting starts."** — three gags with no single landing; the middle sags.
- **"I asked Monday morning for a day off. It took the weekend instead."** — short and punchy, but the twist is the first thing anyone would think of.
- **"Monday again. The coffee didn't work and the weekend was too short."** — worn-out clichés, no concrete detail, no joke that lands.

## Run it

```sh
node main.ts            # writes /output/entry.txt
OUTPUT_DIR=/tmp/out node main.ts   # test locally without touching /output
```

The program validates the entry (UTF-8, 1–200 characters, one line, not
whitespace-only, no trailing newline), writes it, then reads it back and
verifies the file is byte-identical to the constant.
