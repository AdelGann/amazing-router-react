import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  minify: true,
  external: ["amazing-router-routes", "amazing-router-route-files", "react", "react-dom", "react-router"],
});
