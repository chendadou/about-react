import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import path from 'path';

const isDevMode = process.env.NODE_ENV === 'development';

const commonConfig: webpack.Configuration = {
  entry: {
    main: path.resolve(__dirname, '../src/main.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          { loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
          },
        ],
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: [
          { loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
          },
          { loader: 'less-loader', },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          { loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, },
          { loader: 'css-loader', },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            }
          },
          { loader: 'sass-loader', },
        ],
      },

      // ??????????????????
      {
        test: /\.(jpg|jpeg|png|gif|bmp|svg)$/i,
        type: 'asset',
        exclude: /node_modules/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,   // ?????????????????????10kb???base64?????????????????????8kb
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // ???????????????????????????
        },
      },

      // ????????????
      {
        test: /\.(woff2?|otf|ttf|eot)$/i,
        type: 'asset',
        exclude: /node_modules/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,   // ??????10kb???base64?????????????????????8kb
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]', // ???????????????????????????
        },
      },

      // ????????????
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        type: 'asset',
        exclude: /node_modules/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,   // ??????10kb???base64?????????????????????8kb
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]', // ???????????????????????????
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,   // ????????????????????????
      favicon: 'public/favicon.ico',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@routes': path.resolve(__dirname, '../src/routes'),
    },

    // ???????????????????????????????????????node_modules?????????
    modules: [path.resolve(__dirname, '../node_modules')],
    
    // symlinks: false,
  },
  cache: {
    type: 'filesystem', // ??????????????????
  }
};

export default commonConfig;
