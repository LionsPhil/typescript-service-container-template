# Typescript Service Container Template
A minimal project template for a service written in TypeScript built and run as a Docker container.

Tries to do everything neat and proper, as per the state of the art circa May 2016.

# Try it
You can take this repository, put it on a machine [with Docker installed](https://docs.docker.com/linux/step_one/), and run:

```sh
docker build -t foo . && docker run -it -p 8080:8080 foo
```

The service will build, lint, unit test, and run (in the foreground\*) without the need for any Node tools on your workstation itself.

\* Use `docker run` flags as appropriate, although the expected use is build an image with a more sensible tag and push it off to be run under some container orchestration system, like Kubernetes.

## Bonus features
The default code does a few sorta-opinionated things you might want to keep:

 - To *be* a daemon, [Express](http://expressjs.com/) is hosting a tiny dummy server, since most things are web. Feel free to rip this out if you're listening on a Websocket or something.
 - [Winston](https://github.com/winstonjs/winston) is set up with sensible timestamps, feeding into Docker, so you can just get on with logging.
 - A handler is in place to let you close things down cleanly when you `docker stop`.
 - There is a starter [Jasmine](https://jasmine.github.io/2.4/introduction.html) spec that expects testable functions to be split off as a module.
 - There are some custom [linter settings](https://palantir.github.io/tslint/rules/) that you might not agree with.

# Building from here
## Prerequisites
While you can build and run with nothing but Docker, you'll want to [install Node and NPM](https://nodejs.org/en/download/package-manager/) if you want to build outside of the container, have `package.json` and `typings.json` updated for you, and let semi-IDEs like [VSCode](https://code.visualstudio.com/) provide IntelliSense for libraries. The setup deliberately avoids needing to install anything else globally.

## Renaming things
`git grep -i hello` should find anywhere a placeholder string is lurking.

## Add a dependency
1. Add the library itself: `npm install --save websocket`
2. Search for definitions on typings: `node_modules/.bin/typings search websocker`
	1. If found in `dt`, install with the special DefinitelyTyped workarounds: `node_modules/.bin/typings install dt~websocket --global --save`. Watch out for its [dependency-stripping malfeature](https://github.com/typings/typings/issues/214), which means you then have to install *those* too.
	2. Else, just install and save: `node_modules/.bin/typings install websocket --save`

# License and errata
This stuff is public domain. Go nuts, build whatever. It's mostly cribbed together bits of examples and documentation from the wider web anyway.

If you think the template could set better precendents, the most convincing argument is a pull request with a good commit message.
A few starters:

 - Jasmine specifications are currently plain-JavaScript, rather than being run through the TypeScript compiler.
 - It doesn't do anything with Grunt or Gulp, and maybe should. The build rules are straight in the Dockerfile.
 - TypeDoc is in the `dev-dependencies`, but isn't currently being used because 1) building docs inside the container isn't very useful 2) it was being obstinate.
 - Get the modularized source code under a library subdirectory, rather than flopping around in the root directory. TypeScript's new module resolution logic does not make this as simple as `./lib/hello`.
