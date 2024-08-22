// vite.config.ts
import { vitePlugin as remix } from "file:///Users/gauthierbosson/Documents/dev/remix-poc/node_modules/@remix-run/dev/dist/index.js";
import { flatRoutes } from "file:///Users/gauthierbosson/Documents/dev/remix-poc/node_modules/remix-flat-routes/dist/index.js";
import { defineConfig } from "file:///Users/gauthierbosson/Documents/dev/remix-poc/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/gauthierbosson/Documents/dev/remix-poc/node_modules/vite-tsconfig-paths/dist/index.js";
var MODE = process.env.NODE_ENV;
var vite_config_default = defineConfig({
  build: {
    cssMinify: MODE === "production",
    rollupOptions: {
      external: [/node:.*/, "stream", "crypto", "fsevents"]
    },
    sourcemap: true
  },
  server: {
    watch: {
      ignored: ["**/playwright-report/**"]
    }
  },
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*"],
      serverModuleFormat: "esm",
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes, {
          ignoredRouteFiles: [
            ".*",
            "**/*.css",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__*.*",
            // This is for server-side utilities you want to colocate
            // next to your routes without making an additional
            // directory. If you need a route that includes "server" or
            // "client" in the filename, use the escape brackets like:
            // my-route.[server].tsx
            "**/*.server.*",
            "**/*.client.*"
          ]
        });
      }
    }),
    tsconfigPaths()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZ2F1dGhpZXJib3Nzb24vRG9jdW1lbnRzL2Rldi9yZW1peC1wb2NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9nYXV0aGllcmJvc3Nvbi9Eb2N1bWVudHMvZGV2L3JlbWl4LXBvYy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZ2F1dGhpZXJib3Nzb24vRG9jdW1lbnRzL2Rldi9yZW1peC1wb2Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSAnQHJlbWl4LXJ1bi9kZXYnO1xuaW1wb3J0IHsgZmxhdFJvdXRlcyB9IGZyb20gJ3JlbWl4LWZsYXQtcm91dGVzJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5cbmNvbnN0IE1PREUgPSBwcm9jZXNzLmVudi5OT0RFX0VOVjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBjc3NNaW5pZnk6IE1PREUgPT09ICdwcm9kdWN0aW9uJyxcblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbL25vZGU6LiovLCAnc3RyZWFtJywgJ2NyeXB0bycsICdmc2V2ZW50cyddLFxuICAgIH0sXG5cbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHdhdGNoOiB7XG4gICAgICBpZ25vcmVkOiBbJyoqL3BsYXl3cmlnaHQtcmVwb3J0LyoqJ10sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlbWl4KHtcbiAgICAgIGlnbm9yZWRSb3V0ZUZpbGVzOiBbJyoqLyonXSxcbiAgICAgIHNlcnZlck1vZHVsZUZvcm1hdDogJ2VzbScsXG4gICAgICByb3V0ZXM6IGFzeW5jIChkZWZpbmVSb3V0ZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIGZsYXRSb3V0ZXMoJ3JvdXRlcycsIGRlZmluZVJvdXRlcywge1xuICAgICAgICAgIGlnbm9yZWRSb3V0ZUZpbGVzOiBbXG4gICAgICAgICAgICAnLionLFxuICAgICAgICAgICAgJyoqLyouY3NzJyxcbiAgICAgICAgICAgICcqKi8qLnRlc3Que2pzLGpzeCx0cyx0c3h9JyxcbiAgICAgICAgICAgICcqKi9fXyouKicsXG4gICAgICAgICAgICAvLyBUaGlzIGlzIGZvciBzZXJ2ZXItc2lkZSB1dGlsaXRpZXMgeW91IHdhbnQgdG8gY29sb2NhdGVcbiAgICAgICAgICAgIC8vIG5leHQgdG8geW91ciByb3V0ZXMgd2l0aG91dCBtYWtpbmcgYW4gYWRkaXRpb25hbFxuICAgICAgICAgICAgLy8gZGlyZWN0b3J5LiBJZiB5b3UgbmVlZCBhIHJvdXRlIHRoYXQgaW5jbHVkZXMgXCJzZXJ2ZXJcIiBvclxuICAgICAgICAgICAgLy8gXCJjbGllbnRcIiBpbiB0aGUgZmlsZW5hbWUsIHVzZSB0aGUgZXNjYXBlIGJyYWNrZXRzIGxpa2U6XG4gICAgICAgICAgICAvLyBteS1yb3V0ZS5bc2VydmVyXS50c3hcbiAgICAgICAgICAgICcqKi8qLnNlcnZlci4qJyxcbiAgICAgICAgICAgICcqKi8qLmNsaWVudC4qJyxcbiAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlULFNBQVMsY0FBYyxhQUFhO0FBQzdWLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sbUJBQW1CO0FBRTFCLElBQU0sT0FBTyxRQUFRLElBQUk7QUFFekIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsT0FBTztBQUFBLElBQ0wsV0FBVyxTQUFTO0FBQUEsSUFFcEIsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLFdBQVcsVUFBVSxVQUFVLFVBQVU7QUFBQSxJQUN0RDtBQUFBLElBRUEsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFNBQVMsQ0FBQyx5QkFBeUI7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLG1CQUFtQixDQUFDLE1BQU07QUFBQSxNQUMxQixvQkFBb0I7QUFBQSxNQUNwQixRQUFRLE9BQU8saUJBQWlCO0FBQzlCLGVBQU8sV0FBVyxVQUFVLGNBQWM7QUFBQSxVQUN4QyxtQkFBbUI7QUFBQSxZQUNqQjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU1BO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDaEI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
