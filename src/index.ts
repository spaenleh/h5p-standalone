import { H5PStandalone } from "./h5p-standalone";

function initH5P() {
  const queryParams = new URLSearchParams(window.location.search);
  const contentId = decodeURIComponent(queryParams.get("content"));
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (!contentId.match(uuidRegex)) {
    return;
  }

  const options = {
    h5pJsonPath: `../h5p-content/${contentId}/content`,
    // the necessary h5p js files are hardcoded in the standalone integration
    // frameJs: "../h5p-assets/frame.bundle.js",
    frameCss: "./styles/h5p.css",
  };

  const el = document.getElementById("h5p-root");
  new H5PStandalone(el, options);

  // the env variable should contain a list of comma separated values referring to the
  // origins that should be notified of height changes
  // You want at least builder and player in there
  if (import.meta.env.VITE_TARGET_ORIGINS) {
    const targetOrigins = import.meta.env.VITE_TARGET_ORIGINS.split(",");
    const targets = targetOrigins.map((o) => new URL(o).origin);
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        for (let target of targets) {
          const height = entry.contentRect.height;
          window.parent.postMessage({ contentId, height }, target);
        }
      }
    });
    resizeObserver.observe(el);
  } else {
    console.warn(
      "No target origins specified. No resizing event will be emitted"
    );
  }
}

initH5P();
