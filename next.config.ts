// // // import type { NextConfig } from "next";

// // // const nextConfig: NextConfig = {
// // //   /* config options here */
// // // };

// // // export default nextConfig;
// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   webpack: (config) => {
// //     // Prevent Webpack from trying to polyfill Node.js modules
// //     config.resolve.fallback = {
// //       ...config.resolve.fallback,
// //       fs: false,
// //       path: false,
// //     };
// //     return config;
// //   },
// //   experimental: {
// //     esmExternals: 'loose', // allows WASM modules to work better
// //   },
// // };

// // export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config: any) => {
//     // Prevent Webpack from trying to polyfill Node.js modules
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       fs: false,
//       path: false,
//       crypto: false,
//       stream: false,
//       buffer: false,
//     };
    
//     // Handle WASM files properly
//     config.experiments = {
//       ...config.experiments,
//       asyncWebAssembly: true,
//     };
    
//     // Add rule for WASM files
//     config.module.rules.push({
//       test: /\.wasm$/,
//       type: 'webassembly/async',
//     });
    
//     return config;
//   },
//   experimental: {
//     esmExternals: 'loose', // allows WASM modules to work better
//   },
//   // Allow external scripts from MediaPipe CDNs
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'Cross-Origin-Embedder-Policy',
//             value: 'unsafe-none',
//           },
//           {
//             key: 'Cross-Origin-Opener-Policy',
//             value: 'same-origin-allow-popups',
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    // Prevent Webpack from trying to polyfill Node.js modules that cause buffer errors
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false,
      util: false,
      url: false,
      querystring: false,
      http: false,
      https: false,
      os: false,
      assert: false,
      constants: false,
      _stream_duplex: false,
      _stream_passthrough: false,
      _stream_readable: false,
      _stream_writable: false,
      _stream_transform: false,
      timers: false,
      console: false,
      vm: false,
      zlib: false,
      tty: false,
      domain: false,
    };
    
    // Handle WASM files more carefully
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };
    
    // Add rule for WASM files with proper handling
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });
    
    // Ignore problematic modules using the correct webpack reference
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(canvas|jsdom)$/,
      })
    );
    
    return config;
  },
  // More permissive headers for external resources
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Opener-Policy', 
            value: 'unsafe-none',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  // Disable strict mode to prevent some React 18 issues
  reactStrictMode: false,
};

export default nextConfig;