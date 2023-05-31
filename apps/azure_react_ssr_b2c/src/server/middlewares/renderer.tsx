//@ts-nocheck

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import express from "express";
import getHtml from "../html/html";
import path from "path";
import App from "../../client/App";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { ServerStyleSheet } from "styled-components";
import { HelmetProvider } from 'react-helmet-async';

const renderer = (req: express.Request) => {
  const sheet = new ServerStyleSheet();
  const loadableJson = path.resolve(__dirname, "./loadable-stats.json");

  const extractor = new ChunkExtractor({
    statsFile: loadableJson,
    entrypoints: ["client"],
  });

  const helmetContext = {};

  const jsxContent = (
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={req.url}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </ChunkExtractorManager>
  );

  const markup = renderToString(sheet.collectStyles(jsxContent));

  const { helmet: head } = helmetContext;

  const styles = sheet.getStyleTags();

  const htmlData: any = {
    head,
    styles,
    markup,
    extractor,
  };

  const html = getHtml(htmlData);

  return html;
};

export default renderer;
