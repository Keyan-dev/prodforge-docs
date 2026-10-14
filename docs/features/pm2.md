# PM2

```bash
--pm2      # default (off in the minimal preset)
--no-pm2
```

[PM2](https://pm2.keymetrics.io) is a process manager for running Node on a **VM or bare-metal server**. The project gets an `ecosystem.config.cjs`; PM2 itself is installed on the server, not added to `package.json`.

```bash
npm install --global pm2@7.0.4
pnpm build
pm2 start ecosystem.config.cjs
```

## What the config does

```js
{
  script: 'dist/server.js',
  node_args: '--env-file-if-exists=.env',
  exec_mode: 'cluster',
  instances: 'max',          // one process per CPU, sharing the port
  wait_ready: true,          // waits for process.send('ready') once listening
  listen_timeout: 10_000,
  kill_timeout: 15_000,      // longer than SHUTDOWN_TIMEOUT_MS so requests finish
  max_memory_restart: '512M',
}
```

With BullMQ there's a second app for the worker in fork mode. With OpenTelemetry, `NODE_OPTIONS` loads the instrumentation.

## Everyday commands

```bash
pm2 reload ecosystem.config.cjs   # zero-downtime reload after a new build
pm2 logs                          # tail logs
pm2 monit                         # live CPU and memory
pm2 save && pm2 startup           # start on boot
pm2 install pm2-logrotate         # rotate log files
```

**Why PM2:** cluster mode uses every CPU core, and it restarts crashed processes. In containers, use the container runtime instead (see [Docker](./docker#docker-and-pm2)).
