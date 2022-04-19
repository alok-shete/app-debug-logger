const COMMAND = {
  build: "npm run dev",
  copy_dist:
    "cd .. && rm -rf build && mkdir build &&cd dist  && cp * ../build/ ",
  copy_package: "cd .. && cp package.json README.md ./build/",
  deploy_package: "cd .. && cd build && npm publish",
};

module.exports = {
  deploy: [
    COMMAND.build,
    COMMAND.copy_dist,
    COMMAND.copy_package,
    COMMAND.deploy_package,
  ],
  ...COMMAND,
};
