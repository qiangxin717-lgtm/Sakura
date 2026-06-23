# 情商话术每日学 - 上线操作指南

> 本指南教你如何把网站从本地运行变成所有人都能访问的在线社区。

---

## 你需要做的 7 步

### 第 1 步：注册 Supabase 账号（5分钟）

1. 打开 https://supabase.com
2. 点击 "Start your project"，用 GitHub 账号登录（推荐）
3. 登录后进入 Dashboard

### 第 2 步：创建 Supabase 项目（3分钟）

1. 点击 "New Project"
2. 填写：
   - **Name**：`eq-phrases`（或任意名）
   - **Database Password**：设一个强密码，**记下来**（之后用不到，但别丢）
   - **Region**：选 `Southeast Asia (Singapore)` 或离你最近的
3. 点击 "Create new project"，等待约 2 分钟初始化完成

### 第 3 步：执行数据库脚本（2分钟）

1. 在 Supabase Dashboard 左侧菜单点击 **SQL Editor**
2. 点击 "New query"
3. 打开项目里的 `app/supabase-schema.sql` 文件，**复制全部内容**
4. 粘贴到 SQL Editor 的输入框
5. 点击 "Run"（运行），等待执行完成（应该显示 "Success. No rows returned"）

### 第 4 步：配置认证方式（5分钟）

#### 4.1 启用邮箱登录
1. 左侧菜单点击 **Authentication** → **Providers**
2. 找到 **Email**，确认它已启用（默认开启）
3.（可选）在 **Settings** 里关闭 "Confirm email"，这样注册后不用验证邮箱就能登录

#### 4.2 启用 GitHub 登录
1. 打开 https://github.com/settings/developers
2. 点击 "New OAuth App"
3. 填写：
   - **Application name**：`情商话术每日学`
   - **Homepage URL**：`http://localhost:4180`（开发用，上线后改成你的 Vercel 地址）
   - **Authorization callback URL**：从 Supabase 的 GitHub Provider 页面复制 Callback URL（格式是 `https://你的项目ID.supabase.co/auth/v1/callback`）
4. 注册后获取 **Client ID** 和 **Client Secret**
5. 回到 Supabase → Authentication → Providers → **GitHub**，打开开关
6. 把 Client ID 和 Client Secret 填进去，保存

### 第 5 步：获取 API 密钥（1分钟）

1. 左侧菜单点击 **Project Settings**（齿轮图标）
2. 点击 **API**
3. 找到两个值，复制下来：
   - **Project URL**：类似 `https://xxxxxxxxxxxx.supabase.co`
   - **anon public key**：一长串字符

### 第 6 步：配置环境变量（1分钟）

1. 用编辑器打开 `app/.env.local` 文件
2. 替换里面的占位符：
   ```
   VITE_SUPABASE_URL=https://你的真实项目ID.supabase.co
   VITE_SUPABASE_ANON_KEY=你的真实anon_key
   ```
3. 保存文件
4. 重启预览服务器（Ctrl+C 后重新运行 `npm run dev` 或 `npm run preview`）

### 第 7 步：测试 & 上线

#### 本地测试
1. 打开 http://localhost:4180
2. 点击右上角"登录"按钮
3. 注册一个账号（用你的邮箱）
4. 试试发一条社区分享、点赞、评论

#### 设为管理员
1. 回到 Supabase Dashboard → **Table Editor** → **profiles** 表
2. 找到你的用户记录，把 `role` 字段从 `user` 改成 `admin`
3. 刷新网站，右上角头像菜单里会出现"管理后台"入口

#### 部署到 Vercel（让所有人访问）
1. 把 `app` 文件夹推送到 GitHub 仓库
   ```bash
   cd app
   git init
   git add .
   git commit -m "情商话术每日学"
   ```
   注意：确认 `.gitignore` 里有 `.env.local`，不要把密钥传到 GitHub
2. 打开 https://vercel.com，用 GitHub 登录
3. 点击 "New Project"，导入你的仓库
4. **重要**：在部署设置里添加环境变量：
   - `VITE_SUPABASE_URL` = 你的 Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = 你的 anon key
5. 点击 "Deploy"，等待约 1 分钟
6. 部署完成后获得公网地址：`https://你的项目名.vercel.app`
7. **更新 GitHub OAuth 回调地址**：把第 4.2 步的 Homepage URL 和 Callback URL 改成 Vercel 地址

---

## 完成后的效果

- ✅ 所有人都能通过 Vercel 地址访问你的网站
- ✅ 用户可以注册/登录（邮箱或 GitHub）
- ✅ 社区分享是真实多用户互动（你发的别人能看到）
- ✅ 点赞、评论真实生效
- ✅ 收藏、打卡、练习记录云端同步（换设备也能看到）
- ✅ 你作为管理员可以删除违规内容、管理用户

---

## 常见问题

**Q: Supabase 免费额度够用吗？**
A: 免费版有 500MB 数据库、50000 月活用户、2GB 带宽。初期完全够用，超出再升级。

**Q: 数据安全吗？**
A: 已配置 RLS 行级安全，用户只能改自己的数据，社区内容所有人可读但只能改自己的。管理员可以管理所有内容。

**Q: 怎么备份社区数据？**
A: Supabase Dashboard → Database → Backups，免费版有每日自动备份。

**Q: 想加微信登录怎么办？**
A: 需要企业资质申请微信开放平台。有了之后在 Supabase Authentication 里配置（但目前 Supabase 不原生支持微信，需要自定义 OAuth）。
