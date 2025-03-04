import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-restricted-syntax": [
        "error",
        /**
         * アプリケーションのタイムゾーンを利用してしまうため禁止
         */
        {
          selector:
            'CallExpression[callee.type="MemberExpression"][callee.object.callee.name="dayJST"][callee.property.name="toDate"]',
          message:
            "dayJSTのtoDate関数は禁止です。代わりにdayJSTの返すオブジェクトを利用してください。",
        },
        /**
         * アプリケーションのタイムゾーンを利用してしまうため禁止
         */
        {
          message:
            "new Dateは禁止です。代わりにdayJSTの返すオブジェクトを利用してください。",
          selector: "NewExpression[callee.name='Date']",
        },
      ],
    },
  }
);
