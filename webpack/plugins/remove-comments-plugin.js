const webpack = require('webpack')
const { Compilation } = webpack;

function __removeComments(content) {
  return content.replace(/\/\*{2,}\/\s?/g, '')
}

class RemoveCommentsPlugin {

  apply(compiler) {
    const pluginName = 'RemoveCommentsPlugin'
    console.log(`Hello ${pluginName} ~`)

    // compiler.hooks.emit.tap(pluginName, compilation => {
    //   //
    // })

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {

      compilation.hooks.processAssets.tap({
        name: pluginName,
        //https://webpack.js.org/api/compilation-hooks/#list-of-asset-processing-stages
        stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
      }, (assets) => {

        for (let name in assets) {
          if (name.endsWith('js')) {
            console.log(`processing file: ${name}`)

            const noComment = __removeComments(assets[name].source())

            assets[name] = {
              source: () => noComment,
              size: () => noComment.length
            }

          } else {
            console.log(`ignore file: ${name}`)
          }
        }

        console.log('done.')
      })

    })

  }
}

module.exports = RemoveCommentsPlugin
