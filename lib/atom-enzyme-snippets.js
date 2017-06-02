'use babel';

import AtomEnzymeSnippetsView from './atom-enzyme-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  atomEnzymeSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomEnzymeSnippetsView = new AtomEnzymeSnippetsView(state.atomEnzymeSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomEnzymeSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-enzyme-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomEnzymeSnippetsView.destroy();
  },

  serialize() {
    return {
      atomEnzymeSnippetsViewState: this.atomEnzymeSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('AtomEnzymeSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
