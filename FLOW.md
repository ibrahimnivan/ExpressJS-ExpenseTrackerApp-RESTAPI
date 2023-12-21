1. configure scripts after installed package
```json
 "scripts": {
    "dev": "set NODE_ENV=development && nodemon --watch src --ext ts --exec \"tsc && node dist/index.js\"",
    "start": "NODE_ENV=development tsc && node dist/index.js",
    "build": "tsc"
}
```
penjelasan : 
`dev` akan watch perubahan di file ts, jika ada perubahan akan menjalankan "tsc && NODE_ENV=development node dist/index.js\"
`start` : sama tapi ngga nge watch
2. npx tsx --init & configure tsconfig.json
--- outdir
--- ressolveJsonModule 
3. TEST API USING POSTMAN
4. CREATE EXPANSEROUTER AND TEST IT
---   bikin route diindex `app.use("/expenses", expenseRouter);`
5. BIKIN EXPENSES.JSON
6. BIKIN INDEX.ts DI SERVICES>EXPENSES
7. PATH DIRNAME FOR ABSOLUTE PATH 
--- in deployment, sometime we only use dist folder so we cant use relative path
8. FOLDER COMMON
9. BIKIN `getExpense` di service>expenses di lalu digunain di `expanseRouter`
10. BIKIN `postExpense` di service>expenses di lalu digunain di `expanseRouter`
11. bikin `writeFileFromJson` di service>expenses
12. `getCurrentId` di service>expenses
13. berhasil melakukan `post` menggunakan Postman data json di `dist` diisi
--- Problem: jika `run dev` ulang akan ditimpa dari json lama
--- Solusi: `expeenses.json` harus berada di luar src dan dist agar bisa diakses dimanapun, `getFilePath` diperbaiki, include dihapus





