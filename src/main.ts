const path = require('path');
const {AutoLanguageClient} = require('atom-languageclient');
const {filter} = require('fuzzaldrin-plus');
const cp = require('child_process');

class VueLanguageClient extends AutoLanguageClient {
	private _serverManager;
	
	getGrammarScopes () { return ['text.html.vue'] };
	getLanguageName () { return 'Vue' };
	getServerName () { return 'MBRW' };

	startServerProcess () {
		return cp.spawn('node', [require.resolve('vue-language-server/dist/vueServerMain')]);
		// return super.spawnChildNode([ require.resolve('vue-language-server/dist/vueServerMain') ]);
	};

	preInitialization (connection) {
		connection.onCustom('$/partialResult', () => {}); // Suppress partialResult until the language server honours 'streaming' detection
	}

	async getSuggestions (request) {
		const prefix = request.prefix.trim();
		const server = await this._serverManager.getServer(request.editor);

		if (prefix === '' && !request.activatedManually) {
			server.currentSuggestions = [];
			return Promise.resolve([]);
		}

		if (prefix.length > 0 && prefix != '.'  && server.currentSuggestions && server.currentSuggestions.length > 0) {
			// fuzzy filter on this.currentSuggestions
			return new Promise((resolve) => {
				const filtered = filter(server.currentSuggestions, prefix, {key: 'text'})
					.map(s => Object.assign({}, s, {replacementPrefix: prefix}));
				resolve(filtered);
			});
		}

		if (request.activatedManually === true || request.prefix.startsWith('.')) {
			return this.requestAndCleanSuggestions(request)
				.then(suggestions => server.currentSuggestions = suggestions);
			} else {
				server.currentSuggestions = [];
				return Promise.resolve([]);
			}
		}
		

	requestAndCleanSuggestions (request) {
		return super.getSuggestions(request).then(results => {
			if (results != null) {
			for (const result of results) {
				if (result.leftLabel) {
					const index = result.leftLabel.lastIndexOf(':');
						if (index > 0) {
							result.leftLabel = result.leftLabel.substr(index + 1).trim();
						}
					}
				}
			}
			
			return results
		});
	}
}

module.exports = new VueLanguageClient();
