const fs = require("fs");

console.log(process.env);

const environments = Object.fromEntries(
  Object.entries(process.env)
    .filter(([key]) => key.startsWith("ANGULAR_APP_"))
    .map(([key, value]) => [key.replace("ANGULAR_APP_", ""), value])
);

fs.writeFileSync(
  "./src/environments/environments.ts",
  `export const environment = ${JSON.stringify(environments)};`
);
