Phaser.Filter.GlowFilter = function (game) {

    Phaser.Filter.call(this, game);

    var quality = Math.pow(1, 1/3);
    this.quality = quality;
    var distance = 5 * quality;
    var textureWidth = 350* quality;
    var textureHeight = 350 * quality;

    this.uniforms = {
        distance: {type: '1f', value: distance},
        outerStrength: {type: '1f', value: null},
        innerStrength: {type: '1f', value: null},
        glowColor: {type: '4f', value: null},
        pixelWidth: {type: '1f', value: null},
        pixelHeight: {type: '1f', value: null},
    };

    this.color = 0xffffff;
    this.outerStrength = 2;
    this.innerStrength = 1;
    this.textureWidth = textureWidth;
    this.textureHeight = textureHeight;
    this.passes = [this];

    this.fragmentSrc = [
        'precision mediump float;',
        'varying vec2 vTextureCoord;',
        'uniform sampler2D texture;',
        'uniform float distance;',
        'uniform float outerStrength;',
        'uniform float innerStrength;',
        'uniform vec4 glowColor;',
        'uniform float pixelWidth;',
        'uniform float pixelHeight;',
        'vec2 px = vec2(pixelWidth, pixelHeight);',
        'void main(void) {',
        '    const float PI = 3.14159265358979323846264;',
        '    vec4 ownColor = texture2D(texture, vTextureCoord);',
        '    vec4 curColor;',
        '    float totalAlpha = 0.;',
        '    float maxTotalAlpha = 0.;',
        '    float cosAngle;',
        '    float sinAngle;',
        '    for (float angle = 0.; angle <= PI * 2.; angle += ' + (1 / quality / distance).toFixed(7) + ') {',
        '       cosAngle = cos(angle);',
        '       sinAngle = sin(angle);',
        '       for (float curDistance = 1.; curDistance <= ' + distance.toFixed(7) + '; curDistance++) {',
        '           curColor = texture2D(texture, vec2(vTextureCoord.x + cosAngle * curDistance * px.x, vTextureCoord.y + sinAngle * curDistance * px.y));',
        '           totalAlpha += (distance - curDistance) * curColor.a;',
        '           maxTotalAlpha += (distance - curDistance);',
        '       }',
        '    }',
        '    maxTotalAlpha = max(maxTotalAlpha, 0.0001);',

        '    ownColor.a = max(ownColor.a, 0.0001);',
        '    ownColor.rgb = ownColor.rgb / ownColor.a;',
        '    float outerGlowAlpha = (totalAlpha / maxTotalAlpha)  * outerStrength * (1. - ownColor.a);',
        '    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * innerStrength * ownColor.a;',
        '    float resultAlpha = (ownColor.a + outerGlowAlpha);',
        '    gl_FragColor = vec4(mix(mix(ownColor.rgb, glowColor.rgb, innerGlowAlpha / ownColor.a), glowColor.rgb, outerGlowAlpha / resultAlpha) * resultAlpha, resultAlpha);',
        '}'
    ];

};

Phaser.Filter.GlowFilter.prototype = Object.create(Phaser.Filter.prototype);
Phaser.Filter.GlowFilter.prototype.constructor = Phaser.Filter.GlowFilter;

Object.defineProperty(Phaser.Filter.GlowFilter.prototype, 'color', {
    set: function(value) {
        var r = ((value & 0xFF0000) >> 16) / 255,
            g = ((value & 0x00FF00) >> 8) / 255,
            b = (value & 0x0000FF) / 255;
        this.uniforms.glowColor.value = {x: r, y: g, z: b, w: 1};
        this.dirty = true;
    }
});

Object.defineProperty(Phaser.Filter.GlowFilter.prototype, 'distance', {
    set: function (value) {
        this.uniforms.distance.value = value;
        this.dirty = true;
    }
});

Object.defineProperty(Phaser.Filter.GlowFilter.prototype, 'outerStrength', {
    set: function (value) {
        this.uniforms.outerStrength.value = value;
        this.dirty = true;
    }
});

Object.defineProperty(Phaser.Filter.GlowFilter.prototype, 'innerStrength', {
    set: function (value) {
        this.uniforms.innerStrength.value = value;
        this.dirty = true;
    }
});

Object.defineProperty(Phaser.Filter.GlowFilter.prototype, 'textureWidth', {
    set: function(value) {
        this.uniforms.pixelWidth.value = 1 / value;
        this.dirty = true;
    }
});

Object.defineProperty(Phaser.Filter.GlowFilter.prototype, 'textureHeight', {
    set: function(value) {
        this.uniforms.pixelHeight.value = 1 / value;
        this.dirty = true;
    }
});

//module.exports = Phaser.Filter.GlowFilter;
