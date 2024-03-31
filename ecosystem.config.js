module.exports = {
  apps: [
    {
      name: "prod-olim-backoffice",
      script: "yarn",
      args: "start",
      cwd: "/var/www/olim-backoffice",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
