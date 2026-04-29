const { resolve } = require('node:path');
const express = require('express');

const uploadsPath = resolve(__dirname, "..", "..", "uploads");

const fileRouterConfig = express.static(uploadsPath);

module.exports = {
    fileRouterConfig
}