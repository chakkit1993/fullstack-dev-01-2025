#!/bin/bash

# run npx prisma generate
npx prisma generate

# run npx prisma db push
npx prisma db push


npm run dev
