const mergeWith = require('lodash/mergeWith');
const union = require('lodash/union');
const xmlbuilder = require('xmlbuilder');

function mergeStrategy(value, srcValue) {
  if (Array.isArray(value) && Array.isArray(srcValue)) {
    return union(value, srcValue);
  }
  return undefined;
}

function merge(srcObject, object) {
  return mergeWith(srcObject, object, mergeStrategy);
}

function obj2Xml(obj) {
  return xmlbuilder
    .create(obj, {
      headless: true,
    })
    .end({
      pretty: true,
      indent: '\t',
    });
}

function getResolutionSize(resolution) {
  switch (resolution) {
    case 'hd':
      return [1280, 720];
    case 'fhd':
      return [1920, 1080];
    default:
      throw new Error(`Unsupported resolution ${resolution}`);
  }
}

function getDateString() {
  const date = new Date();

  return [
    (`0${date.getHours()}`).slice(-2),
    (`0${date.getMinutes()}`).slice(-2),
    (`0${date.getSeconds()}`).slice(-2),
  ].join(':');
}

module.exports = {
  merge,
  obj2Xml,
  getResolutionSize,
  getDateString,
};
