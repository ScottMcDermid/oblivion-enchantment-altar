# 🔮 Oblivion Enchantment Altar

Design and preview enchanted gear for *The Elder Scrolls IV: Oblivion* with ease.  
Source for https://enchanting.oblivion.tools

![Next.js](https://img.shields.io/badge/Next.js-13+-000?logo=nextdotjs&logoColor=white)
![Dockerized](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-GPLv3-blue.svg)

## ✨ Features
- Accurate recreation of the in-game altar UI for quick prototyping
- Real-time previews so you can iterate on enchantments before jumping in game
- Docker-first workflow for predictable local and prod deployments

## 🚀 Launching

### Development
Ensure `docker`, `docker compose`, and `make` are installed, then start the dev server:

```bash
make dev
```

Navigate to [http://localhost:3000](http://localhost:3000).

### Deploying
Build and launch the production image:

```bash
make prod-build
```

Navigate to [http://localhost:3000](http://localhost:3000).

## 🔧 Environment Variables
Define overrides in `.env` to tweak container behavior.

| Name             | Purpose                |
| ---------------- | ---------------------- |
| `CONTAINER_NAME` | Docker container name  |
| `PORT`           | Port server listens to |

## ⚖️ Legal
This is an unofficial fan project and is not affiliated with or endorsed by Bethesda Softworks or ZeniMax Media. *The Elder Scrolls*, *Oblivion*, and related assets are trademarks or registered trademarks of their respective owners. Use this tool and any generated content at your own risk and in accordance with Bethesda's modding guidelines.
