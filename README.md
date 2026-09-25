# OmniRoute on Render

Production-ready deployment repository for running [OmniRoute](https://github.com/diegosouzapw/OmniRoute) on [Render](https://render.com).

---

## 🚀 Quick Setup on Render

### Option A: Standard Web Service (Manual)

1. Push this repository to your GitHub.
2. In Render Dashboard, click **New +** → **Web Service**.
3. Select your GitHub repository.
4. Configure the settings:
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free` or `Starter`

> **Note**: If you prefer global CLI install without dependencies:
> - **Build Command**: `npm install -g omniroute`
> - **Start Command**: `omniroute --no-open` (or `npx -y omniroute --no-open`)

---

## ⚙️ Environment Variables

Add these under the **Environment** tab in Render:

| Variable | Recommended Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Production mode |
| `OMNIROUTE_SERVER_HOST` | `0.0.0.0` | Bind to all interfaces for Render's router |
| `REQUIRE_API_KEY` | `true` | **CRITICAL**: Protects your public `/v1/*` endpoint from unauthorized access |
| `INITIAL_PASSWORD` | `YourStrongAdminPassword` | Dashboard admin password on initial boot |
| `JWT_SECRET` | `A_RANDOM_LONG_SECRET` | Secret key for dashboard auth session cookies |
| `API_KEY_SECRET` | `A_32_CHAR_HEX_SECRET` | 32-byte hex key to encrypt stored API keys in SQLite |
| `PORT` | *(Render sets this automatically)* | OmniRoute reads `process.env.PORT` automatically |

*(Optional for Persistent Storage on Render Paid Plans)*:
| `DATA_DIR` | `/var/lib/omniroute` | Path to persistent storage disk mount point |

---

## 🔍 How OmniRoute Handles Ports on Render

1. **Native PORT Recognition**: OmniRoute natively checks `opts.port ?? process.env.PORT ?? "20128"`. Because Render automatically injects the `PORT` environment variable, OmniRoute will bind to Render's allocated port even without extra flags.
2. **CLI Port Option**: OmniRoute accepts `--port <number>`. On Render/Linux, you can also run `omniroute --port $PORT --no-open`.
3. **Headless Linux (`--no-open`)**: OmniRoute tries to open a local desktop browser by default on boot. On Render (headless Linux), passing `--no-open` avoids unnecessary warnings or spawn errors.

---

## 🛡️ Critical Security Notice

By default, OmniRoute is built as a local developer proxy that allows unauthenticated inference requests. When deployed to a public cloud like Render (`https://your-app.onrender.com`), anyone can send requests to `/v1/chat/completions` and consume your provider credits.

**Always set `REQUIRE_API_KEY=true` on public cloud deployments.**
