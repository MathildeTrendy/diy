"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withFirebaseAppDelegate = void 0;
exports.modifyObjcAppDelegate = modifyObjcAppDelegate;
exports.modifyAppDelegateAsync = modifyAppDelegateAsync;
const config_plugins_1 = require("@expo/config-plugins");
const generateCode_1 = require("@expo/config-plugins/build/utils/generateCode");
const fs_1 = __importDefault(require("fs"));
const methodInvocationBlock = `[FIRApp configure];`;
// https://regex101.com/r/mPgaq6/1
const methodInvocationLineMatcher = /(?:self\.moduleName\s*=\s*@\"([^"]*)\";)|(?:(self\.|_)(\w+)\s?=\s?\[\[UMModuleRegistryAdapter alloc\])|(?:RCTBridge\s?\*\s?(\w+)\s?=\s?\[(\[RCTBridge alloc\]|self\.reactDelegate))/g;
// https://regex101.com/r/nHrTa9/1/
// if the above regex fails, we can use this one as a fallback:
const fallbackInvocationLineMatcher = /-\s*\(BOOL\)\s*application:\s*\(UIApplication\s*\*\s*\)\s*\w+\s+didFinishLaunchingWithOptions:/g;
function modifyObjcAppDelegate(contents) {
    // Add import
    if (!contents.includes('#import <Firebase/Firebase.h>')) {
        contents = contents.replace(/#import "AppDelegate.h"/g, `#import "AppDelegate.h"
#import <Firebase/Firebase.h>`);
    }
    // To avoid potential issues with existing changes from older plugin versions
    if (contents.includes(methodInvocationBlock)) {
        return contents;
    }
    if (!methodInvocationLineMatcher.test(contents) &&
        !fallbackInvocationLineMatcher.test(contents)) {
        config_plugins_1.WarningAggregator.addWarningIOS('@react-native-firebase/app', 'Unable to determine correct Firebase insertion point in AppDelegate.m. Skipping Firebase addition.');
        return contents;
    }
    // Add invocation
    try {
        return (0, generateCode_1.mergeContents)({
            tag: '@react-native-firebase/app-didFinishLaunchingWithOptions',
            src: contents,
            newSrc: methodInvocationBlock,
            anchor: methodInvocationLineMatcher,
            offset: 0, // new line will be inserted right above matched anchor
            comment: '//',
        }).contents;
    }
    catch (e) {
        // tests if the opening `{` is in the new line
        const multilineMatcher = new RegExp(fallbackInvocationLineMatcher.source + '.+\\n*{');
        const isHeaderMultiline = multilineMatcher.test(contents);
        // we fallback to another regex if the first one fails
        return (0, generateCode_1.mergeContents)({
            tag: '@react-native-firebase/app-didFinishLaunchingWithOptions-fallback',
            src: contents,
            newSrc: methodInvocationBlock,
            anchor: fallbackInvocationLineMatcher,
            // new line will be inserted right below matched anchor
            // or two lines, if the `{` is in the new line
            offset: isHeaderMultiline ? 2 : 1,
            comment: '//',
        }).contents;
    }
}
async function modifyAppDelegateAsync(appDelegateFileInfo) {
    const { language, path, contents } = appDelegateFileInfo;
    if (['objc', 'objcpp'].includes(language)) {
        const newContents = modifyObjcAppDelegate(contents);
        await fs_1.default.promises.writeFile(path, newContents);
    }
    else {
        // TODO: Support Swift
        throw new Error(`Cannot add Firebase code to AppDelegate of language "${language}"`);
    }
}
const withFirebaseAppDelegate = config => {
    return (0, config_plugins_1.withDangerousMod)(config, [
        'ios',
        async (config) => {
            const fileInfo = config_plugins_1.IOSConfig.Paths.getAppDelegate(config.modRequest.projectRoot);
            await modifyAppDelegateAsync(fileInfo);
            return config;
        },
    ]);
};
exports.withFirebaseAppDelegate = withFirebaseAppDelegate;
