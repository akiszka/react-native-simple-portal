[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) 
# Simple Portal for React Native &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/akiszka/react-native-simple-portal/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react-native-simple-portal.svg?style=flat)](https://www.npmjs.com/package/react-native-simple-portal)

**react-native-simple-portal**

> This is a small implementation of Portals for React Native. It allows you to place components anywhere in the tree without hassle.

# Features

* less than 70 lines of code (including spaces)
* written in `Typescript`
* able to create multiple portals
* compatibile with `Expo`

# Usage

Add the package to your project: `yarn add react-native-simple-portal`.

Then, wrap your app with the `PortalProvider`. The placement of this component has no influence on how your app looks, but any portals will have to be inside it.

```tsx
export function App() {
    return (
        <PortalProvider>
            <TheRestOfYourApp />
        </PortalProvider>
    )
}
```

Now, you're all set to use portals. The library provides two components: `PortalIn` and `PortalOut`. Both of them accept a single prop - `gateName`. Anything you put in a `PortalIn` will be displayed inside the `PortalOut` with a mathing `gateName`.

For example:

```tsx
function ExampleScreen() {
    return (
        <View>
            <Component1 />
            {/* ... */}
            <PortalOut gateName="example" />
        </View>
    )
}

function Component1() {
    return (
        <View>
            <Text>Hello, world!</Text>

            <PortalIn gateName="example">
                <Text>I've teleported!</Text>
            </PortalIn>
        </View>
    )
}
```

When you place this code in your app, the text "I've teleported" will not be a child of `Component1`, but instead of `ExampleScreen`.

**NOTE: you should not create two PortalIns or PortalOuts with the same gateName. This will cause undefided behaviour.**

# Roadmap

- [ ] add tests
- [ ] implement hooks
- [ ] add use cases to readme (pressable with position absolute)