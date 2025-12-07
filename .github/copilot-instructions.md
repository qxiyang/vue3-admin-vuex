# 为 AI 编码代理准备的快速上手说明

下面是针对本项目（`vite-01`）的精简、可操作的指导，帮助 AI 编码代理快速、安全、正确地贡献代码。

## 一眼看懂架构（大局）
- **框架**：Vue 3 + Vite（入口 `src/main.js`）。UI 使用 Element Plus，图标通过 `@element-plus/icons-vue` 全局注册。
- **路由**：`src/router/index.js` 定义主路由结构，`src/main.js` 会在启动时从 `localStorage` 中读取 `pz_pz`（由 `vuex-persistedstate` 保存）并通过 `router.addRoute('main', item)` 动态挂载路由。
- **状态管理**：使用 Vuex（`src/store/index.js`），包含 `menu` 模块并启用了 `vuex-persistedstate`（key=`pz_pz`）来持久化菜单/路由信息。
- **后端通讯**：所有 HTTP 请求封装在 `src/utils/request.js`（基于 axios，`baseURL` 为 `https://v3pz.itndedu.com/v3pz`）。API 列表集中在 `src/api/index.js`。

## 关键约定与模式（必须遵守）
- **动态路由来源**：菜单/路由数据来自后端并存入 `localStorage`（`pz_pz`），因此修改路由结构时要保证与 `src/store/menu.js` 保存的数据结构兼容，且 `src/main.js` 的动态挂载逻辑仍能解析。
- **认证与拦截器**：token 存储在 `localStorage` 的 `pz_token`，拦截器在 `src/utils/request.js` 中会为非白名单请求添加 `x-token` 头。后端约定：
  - `response.data.code === -1`：提示警告（不抛出）。
  - `response.data.code === -2`：token 错误，代理应触发清理 `pz_useInfo`/`pz_token` 并重定向到根页面。
- **白名单接口**：`/get/code`、`/user/authentication`、`/login`（不添加 token）。
- **组件引入**：项目使用 `unplugin-auto-import` 与 `unplugin-vue-components`（ElementPlusResolver），因此大多数 Element Plus 组件/API 可直接使用，无需手动 import。图标在 `src/main.js` 全局注册。

## 开发/构建/运行（命令）
- 本地开发（Windows PowerShell）：
  - `npm install` （首次）
  - `npm run dev` （启动 Vite 开发服务器）
- 打包：`npm run build`
- 预览构建产物：`npm run preview`

## 修改/新增 API 的建议位置与示例
- 所有接口函数集中在 `src/api/index.js`。新增接口时：
  - 在 `src/api/index.js` 中导出新的函数，例如：
    ```js
    // 示例：
    export const getUsers = (params) => request.get('/users', { params })
    ```
  - 使用时在组件中导入：`import { getUsers } from '@/api'` 或相对路径（项目未配置 alias，建议使用相对路径）。

## 路由/菜单变更注意事项
- 修改菜单或路由结构时请同时考虑：
  - `src/store/menu.js` 的存储结构（`routerList` 等字段）
  - `src/main.js` 中用来恢复并通过 `router.addRoute('main', item)` 动态挂载的流程
  - 若添加受保护路由，确保 `router.beforeEach`（在 `src/main.js`）的 token 检查逻辑仍然生效

## 代码风格/语言习惯（可从代码中直接观察到）
- 注释和 UI 文案常使用中文。路由 meta 常带 `id/name/icon/path/describe` 等字段。
- network 层使用 axios 实例化并在拦截器中统一处理 token 与错误提示（使用 Element Plus 的 `ElMessage`）。

## 常见改动示例（AI 助手可直接做的改动）
- 修复或新增 API 映射到 `src/api/index.js`。
- 调整请求/响应错误处理逻辑在 `src/utils/request.js` 中修改拦截器。
- 新增页面组件放在 `src/views/...` 并在菜单数据中生成对应 `meta.path`，服务端或本地 mock 必须与前端期待字段一致。

## 不要假设的事项（避免犯错）
- 不要直接修改 `localStorage` 的 key 名称（`pz_pz`、`pz_token`、`pz_useInfo`）除非同步修改所有使用点。
- 不要绕过 `router.addRoute` 动态挂载的流程，静态在 `routes.children` 写死的路由目前被注释，项目依赖动态路由恢复逻辑。

---
如果你希望我把这份说明更改为英文，补充 `src/store/menu.js` 的具体结构说明，或把示例替换成更详细的代码片段，请告诉我需要补充的部分，我会立刻迭代。
