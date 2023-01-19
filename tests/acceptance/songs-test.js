import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'rarwe/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | songs', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Sort songs in various ways', async function (assert) {
    let band = this.server.create('band', { name: 'Them Crooked Vultures' });
    this.server.create('song', {
      title: 'Mind Eraser, No Chaser',
      ratin: 2,
      band,
    });
    this.server.create('song', { title: 'Elephants', rating: 4, band });
    this.server.create('song', {
      title: 'Spinning in Daffodils',
      rating: 5,
      band,
    });
    this.server.create('song', { title: 'New Fang', rating: 3, band });

    await visit('/');
    await click('[data-test-rr=band-link]');
  });



});
