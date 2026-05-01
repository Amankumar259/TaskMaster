module.exports = {
  apps: [
    {
      name: "taskmaster",
      script: "server.ts",
      interpreter: "tsx",
      watch: false,
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      max_memory_restart: "1G",
      max_restarts: 10,
      min_uptime: "10s",
      kill_timeout: 5000,
    },
  ],
};
