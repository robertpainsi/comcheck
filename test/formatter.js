/**
 * formatter.js
 */
var assert = require('assert');

var comcheck;
describe('comcheck-formatter', () => {
    beforeEach(() => {
        comcheck = require('../index')();
    });

    var compare = function(unformatted, expected, ignore) {
        if (Array.isArray(expected)) expected = expected.join('\n');
        assert.equal(comcheck.format(unformatted, ignore), expected);
    };

    it('simple example', () => {
        compare([
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt, blandit arcu eget, fringilla nulla.'
        ], [
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae',
            'sem tincidunt, blandit arcu eget, fringilla nulla.'
        ]);
    });

    it('complex example', () => {
        compare(
            'Lorem ipsum\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt, blandit arcu eget, fringilla nulla. Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum porta. Integer non urna sed sem suscipit condimentum. Integer justo augue, elementum non tortor non, condimentum bibendum libero. Aenean interdum venenatis dolor ac eleifend. Etiam tincidunt consequat est quis vulputate. Donec in molestie dui, et commodo tellus. Nullam maximus tellus eget dui convallis, nec consectetur lacus mollis. Curabitur blandit nisi velit, ut auctor massa tincidunt eu. In nec imperdiet dolor. Proin suscipit luctus elit. Vivamus facilisis urna sem, quis finibus sapien convallis eu.\n\n- In ut justo nunc.\n- Praesent in rutrum ante. Sed fermentum feugiat ipsum vitae pellentesque.\n- Etiam et urna accumsan, dictum ex at, faucibus nisi. Nulla ut nibh non mi faucibus interdum.\n- Donec at facilisis lacus. Aliquam sodales aliquet mi, vel ultrices mi hendrerit et.\n- Donec luctus egestas neque a molestie.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec id fringilla ligula. Duis eu imperdiet dui, id vestibulum metus. Ut nec diam turpis. Cras id ornare mi. Etiam facilisis, ipsum vitae malesuada molestie, libero mi rhoncus tellus, sed posuere tortor velit lobortis magna. Sed non quam placerat, feugiat felis sit amet, luctus magna. Morbi pharetra eleifend nunc eget dapibus. Suspendisse potenti. Sed porta volutpat pharetra. Morbi vel nisi iaculis, pharetra nunc id, hendrerit enim. Ut non mi auctor, finibus turpis non, consequat diam.',
            'Lorem ipsum\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae\nsem tincidunt, blandit arcu eget, fringilla nulla. Suspendisse finibus\nfelis vulputate dui pulvinar, non dignissim ipsum porta. Integer non\nurna sed sem suscipit condimentum. Integer justo augue, elementum non\ntortor non, condimentum bibendum libero. Aenean interdum venenatis dolor\nac eleifend. Etiam tincidunt consequat est quis vulputate. Donec in\nmolestie dui, et commodo tellus. Nullam maximus tellus eget dui\nconvallis, nec consectetur lacus mollis. Curabitur blandit nisi velit,\nut auctor massa tincidunt eu. In nec imperdiet dolor. Proin suscipit\nluctus elit. Vivamus facilisis urna sem, quis finibus sapien convallis\neu.\n\n- In ut justo nunc.\n- Praesent in rutrum ante. Sed fermentum feugiat ipsum vitae\n  pellentesque.\n- Etiam et urna accumsan, dictum ex at, faucibus nisi. Nulla ut nibh non\n  mi faucibus interdum.\n- Donec at facilisis lacus. Aliquam sodales aliquet mi, vel ultrices mi\n  hendrerit et.\n- Donec luctus egestas neque a molestie.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur\nridiculus mus. Donec id fringilla ligula. Duis eu imperdiet dui, id\nvestibulum metus. Ut nec diam turpis. Cras id ornare mi. Etiam\nfacilisis, ipsum vitae malesuada molestie, libero mi rhoncus tellus, sed\nposuere tortor velit lobortis magna. Sed non quam placerat, feugiat\nfelis sit amet, luctus magna. Morbi pharetra eleifend nunc eget dapibus.\nSuspendisse potenti. Sed porta volutpat pharetra. Morbi vel nisi\niaculis, pharetra nunc id, hendrerit enim. Ut non mi auctor, finibus\nturpis non, consequat diam.'
        );
    });

    it('should add separate the header and body by an empty line', () => {
        compare([
            'Lorem ipsum',
            'Lorem ipsum dolor.'
        ], [
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor.'
        ]);
    });

    it('should let the header exceed', () => {
        compare([
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt'
        ], [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt'
        ]);
    });

    it('should split a very long line correctly', () => {
        compare([
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt, blandit arcu eget, fringilla nulla. Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum porta. Integer non urna sed sem suscipit condimentum. Integer justo augue, elementum non tortor non, condimentum bibendum libero. Aenean interdum venenatis dolor ac eleifend. Etiam tincidunt consequat est quis vulputate. Donec in molestie dui, et commodo tellus. Nullam maximus tellus eget dui convallis, nec consectetur lacus mollis. Curabitur blandit nisi velit, ut auctor massa tincidunt eu. In nec imperdiet dolor. Proin suscipit luctus elit. Vivamus facilisis urna sem, quis finibus sapien convallis eu.'
        ], [
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae',
            'sem tincidunt, blandit arcu eget, fringilla nulla. Suspendisse finibus',
            'felis vulputate dui pulvinar, non dignissim ipsum porta. Integer non',
            'urna sed sem suscipit condimentum. Integer justo augue, elementum non',
            'tortor non, condimentum bibendum libero. Aenean interdum venenatis dolor',
            'ac eleifend. Etiam tincidunt consequat est quis vulputate. Donec in',
            'molestie dui, et commodo tellus. Nullam maximus tellus eget dui',
            'convallis, nec consectetur lacus mollis. Curabitur blandit nisi velit,',
            'ut auctor massa tincidunt eu. In nec imperdiet dolor. Proin suscipit',
            'luctus elit. Vivamus facilisis urna sem, quis finibus sapien convallis',
            'eu.'
        ]);
    });

    it('should split paragraphs correctly', () => {
        compare([
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt, blandit arcu eget, fringilla nulla.',
            '',
            'Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum porta.',
            '',
            'Integer non urna sed sem suscipit condimentum. Integer justo augue, elementum non tortor non, condimentum bibendum libero.'
        ], [
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae',
            'sem tincidunt, blandit arcu eget, fringilla nulla.',
            '',
            'Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum',
            'porta.',
            '',
            'Integer non urna sed sem suscipit condimentum. Integer justo augue,',
            'elementum non tortor non, condimentum bibendum libero.'
        ]);
    });

    it('should not change a correctly formatted message', () => {
        compare(
            'Lorem ipsum\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae\nsem tincidunt, blandit arcu eget, fringilla nulla. Suspendisse finibus\nfelis vulputate dui pulvinar, non dignissim ipsum porta. Integer non\nurna sed sem suscipit condimentum. Integer justo augue, elementum non\ntortor non, condimentum bibendum libero. Aenean interdum venenatis dolor\nac eleifend. Etiam tincidunt consequat est quis vulputate. Donec in\nmolestie dui, et commodo tellus. Nullam maximus tellus eget dui\nconvallis, nec consectetur lacus mollis. Curabitur blandit nisi velit,\nut auctor massa tincidunt eu. In nec imperdiet dolor. Proin suscipit\nluctus elit. Vivamus facilisis urna sem, quis finibus sapien convallis\neu.\n\n- In ut justo nunc.\n- Praesent in rutrum ante. Sed fermentum feugiat ipsum vitae\n  pellentesque.\n- Etiam et urna accumsan, dictum ex at, faucibus nisi. Nulla ut nibh non\n  mi faucibus interdum.\n- Donec at facilisis lacus. Aliquam sodales aliquet mi, vel ultrices mi\n  hendrerit et.\n- Donec luctus egestas neque a molestie.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur\nridiculus mus. Donec id fringilla ligula. Duis eu imperdiet dui, id\nvestibulum metus. Ut nec diam turpis. Cras id ornare mi. Etiam\nfacilisis, ipsum vitae malesuada molestie, libero mi rhoncus tellus, sed\nposuere tortor velit lobortis magna. Sed non quam placerat, feugiat\nfelis sit amet, luctus magna. Morbi pharetra eleifend nunc eget dapibus.\nSuspendisse potenti. Sed porta volutpat pharetra. Morbi vel nisi\niaculis, pharetra nunc id, hendrerit enim. Ut non mi auctor, finibus\nturpis non, consequat diam.',
            'Lorem ipsum\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae\nsem tincidunt, blandit arcu eget, fringilla nulla. Suspendisse finibus\nfelis vulputate dui pulvinar, non dignissim ipsum porta. Integer non\nurna sed sem suscipit condimentum. Integer justo augue, elementum non\ntortor non, condimentum bibendum libero. Aenean interdum venenatis dolor\nac eleifend. Etiam tincidunt consequat est quis vulputate. Donec in\nmolestie dui, et commodo tellus. Nullam maximus tellus eget dui\nconvallis, nec consectetur lacus mollis. Curabitur blandit nisi velit,\nut auctor massa tincidunt eu. In nec imperdiet dolor. Proin suscipit\nluctus elit. Vivamus facilisis urna sem, quis finibus sapien convallis\neu.\n\n- In ut justo nunc.\n- Praesent in rutrum ante. Sed fermentum feugiat ipsum vitae\n  pellentesque.\n- Etiam et urna accumsan, dictum ex at, faucibus nisi. Nulla ut nibh non\n  mi faucibus interdum.\n- Donec at facilisis lacus. Aliquam sodales aliquet mi, vel ultrices mi\n  hendrerit et.\n- Donec luctus egestas neque a molestie.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur\nridiculus mus. Donec id fringilla ligula. Duis eu imperdiet dui, id\nvestibulum metus. Ut nec diam turpis. Cras id ornare mi. Etiam\nfacilisis, ipsum vitae malesuada molestie, libero mi rhoncus tellus, sed\nposuere tortor velit lobortis magna. Sed non quam placerat, feugiat\nfelis sit amet, luctus magna. Morbi pharetra eleifend nunc eget dapibus.\nSuspendisse potenti. Sed porta volutpat pharetra. Morbi vel nisi\niaculis, pharetra nunc id, hendrerit enim. Ut non mi auctor, finibus\nturpis non, consequat diam.'
        );
    });

    it('should not change a complex but correctly formatted message', () => {
        compare(
            'Lorem ipsum\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae\nsem tincidunt, blandit arcu eget, fringilla nulla. Suspendisse finibus\nfelis vulputate dui pulvinar, non dignissim ipsum porta. Integer non\nurna sed sem suscipit condimentum. Integer justo augue, elementum non\ntortor non, condimentum bibendum libero. Aenean interdum venenatis dolor\nac eleifend. Etiam tincidunt consequat est quis vulputate. Donec in\nmolestie dui, et commodo tellus. Nullam maximus tellus eget dui\nconvallis, nec consectetur lacus mollis. Curabitur blandit nisi velit,\nut auctor massa tincidunt eu. In nec imperdiet dolor. Proin suscipit\nluctus elit. Vivamus facilisis urna sem, quis finibus sapien convallis\neu.\n\n- In ut justo nunc.\n- Praesent in rutrum ante. Sed fermentum feugiat ipsum vitae\n  pellentesque.\n- Etiam et urna accumsan, dictum ex at, faucibus nisi. Nulla ut nibh non\n  mi faucibus interdum.\n- Donec at facilisis lacus. Aliquam sodales aliquet mi, vel ultrices mi\n  hendrerit et.\n- Donec luctus egestas neque a molestie.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur\nridiculus mus. Donec id fringilla ligula. Duis eu imperdiet dui, id\nvestibulum metus. Ut nec diam turpis. Cras id ornare mi. Etiam\nfacilisis, ipsum vitae malesuada molestie, libero mi rhoncus tellus, sed\nposuere tortor velit lobortis magna. Sed non quam placerat, feugiat\nfelis sit amet, luctus magna. Morbi pharetra eleifend nunc eget dapibus.\nSuspendisse potenti. Sed porta volutpat pharetra. Morbi vel nisi\niaculis, pharetra nunc id, hendrerit enim. Ut non mi auctor, finibus\nturpis non, consequat diam.',
            'Lorem ipsum\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae\nsem tincidunt, blandit arcu eget, fringilla nulla. Suspendisse finibus\nfelis vulputate dui pulvinar, non dignissim ipsum porta. Integer non\nurna sed sem suscipit condimentum. Integer justo augue, elementum non\ntortor non, condimentum bibendum libero. Aenean interdum venenatis dolor\nac eleifend. Etiam tincidunt consequat est quis vulputate. Donec in\nmolestie dui, et commodo tellus. Nullam maximus tellus eget dui\nconvallis, nec consectetur lacus mollis. Curabitur blandit nisi velit,\nut auctor massa tincidunt eu. In nec imperdiet dolor. Proin suscipit\nluctus elit. Vivamus facilisis urna sem, quis finibus sapien convallis\neu.\n\n- In ut justo nunc.\n- Praesent in rutrum ante. Sed fermentum feugiat ipsum vitae\n  pellentesque.\n- Etiam et urna accumsan, dictum ex at, faucibus nisi. Nulla ut nibh non\n  mi faucibus interdum.\n- Donec at facilisis lacus. Aliquam sodales aliquet mi, vel ultrices mi\n  hendrerit et.\n- Donec luctus egestas neque a molestie.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur\nridiculus mus. Donec id fringilla ligula. Duis eu imperdiet dui, id\nvestibulum metus. Ut nec diam turpis. Cras id ornare mi. Etiam\nfacilisis, ipsum vitae malesuada molestie, libero mi rhoncus tellus, sed\nposuere tortor velit lobortis magna. Sed non quam placerat, feugiat\nfelis sit amet, luctus magna. Morbi pharetra eleifend nunc eget dapibus.\nSuspendisse potenti. Sed porta volutpat pharetra. Morbi vel nisi\niaculis, pharetra nunc id, hendrerit enim. Ut non mi auctor, finibus\nturpis non, consequat diam.'
        );
    });

    it('should not format ignored lines', () => {
        compare([
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt, blandit arcu eget, fringilla nulla.',
            '',
            'Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum porta.',
            '',
            'Integer non urna sed sem suscipit condimentum. Integer justo augue, elementum non tortor non, condimentum bibendum libero.'
        ], [
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae',
            'sem tincidunt, blandit arcu eget, fringilla nulla.',
            '',
            'Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum porta.',
            '',
            'Integer non urna sed sem suscipit condimentum. Integer justo augue,',
            'elementum non tortor non, condimentum bibendum libero.'
        ], [5]);
    });

    it('should update ignored lines row numbers', () => {
        var ignore = [4];
        comcheck.format([
            'Lorem ipsum',
            '',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt, blandit arcu eget, fringilla nulla. Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum porta.',
            'Integer non urna sed sem suscipit condimentum. Integer justo augue, elementum non tortor non, condimentum bibendum libero.'
        ], ignore);
        assert.deepEqual(ignore, [6]);
    });

    it('should indent enumerations correctly', () => {
        compare([
            'Lorem ipsum',
            '',
            '* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt, blandit arcu eget, fringilla nulla.',
            '',
            '* Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum porta.',
            '',
            '* Integer non urna sed sem suscipit condimentum. Integer justo augue, elementum non tortor non, condimentum bibendum libero.'
        ], [
            'Lorem ipsum',
            '',
            '* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus',
            '  vitae sem tincidunt, blandit arcu eget, fringilla nulla.',
            '',
            '* Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum',
            '  porta.',
            '',
            '* Integer non urna sed sem suscipit condimentum. Integer justo augue,',
            '  elementum non tortor non, condimentum bibendum libero.'

        ]);
    });

    it('should not join enumerations', () => {
        compare([
            'Lorem ipsum',
            '',
            '- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae sem tincidunt, blandit arcu eget, fringilla nulla.',
            '- Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum porta.',
            '- Integer non urna sed sem suscipit condimentum. Integer justo augue, elementum non tortor non, condimentum bibendum libero.'
        ], [
            'Lorem ipsum',
            '',
            '- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus',
            '  vitae sem tincidunt, blandit arcu eget, fringilla nulla.',
            '- Suspendisse finibus felis vulputate dui pulvinar, non dignissim ipsum',
            '  porta.',
            '- Integer non urna sed sem suscipit condimentum. Integer justo augue,',
            '  elementum non tortor non, condimentum bibendum libero.'

        ]);
    });

    it('should not combine the line after an ignored line', () => {
        compare([
            'Merge Pull Request',
            '',
            'Hello,',
            'aaaaaa 123456789012345678901234567890123456789012345678901234567890123456789',
            'is it me you are looking for? I can see it in your eyes,',
            'I can see it in your smile.'
        ], [
            'Merge Pull Request',
            '',
            'Hello,',
            'aaaaaa 123456789012345678901234567890123456789012345678901234567890123456789',
            'is it me you are looking for? I can see it in your eyes, I can see it in',
            'your smile.'
        ], [4]);
    });
});
