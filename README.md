## Oblivion Enchantment Altar

Design and preview enchanted gear with ease.

Source for https://enchanting.oblivion.tools

### Launching

#### Development

First, ensure `docker`, `docker compose` and `make` are installed.

Now start the development server

```bash
make dev
```

Naviage to [http://localhost:3000](http://localhost:3000)

#### Deploying

To start production:

```bash
make prod-build
```

Naviage to [http://localhost:3000](http://localhost:3000)

### Environment Variables

You can modify `.env` for any locally defined environment variables

| Name             | Purpose                |
| ---------------- | ---------------------- |
| `CONTAINER_NAME` | Docker container name  |
| `PORT`           | Port server listens to |
