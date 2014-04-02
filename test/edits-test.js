var assert = require('assert');
var should = require('should');
var expect = require('chai').expect;
var edits = require('../index');
var fs = require('fs');

var S1 = 'thew';
var S2 = 'threw';
var S1_S2 = [['t', 't'],['h', 'h'],['-','r'],['e','e'],['w','w']];
var S2_S1 = [['t', 't'],['h', 'h'],['r','-'],['e','e'],['w','w']];
var S3 = 'the';
var S1_S3 = [['t', 't'],['h', 'h'],['e','e'],['w','-']];
var S3_S1 = [['t', 't'],['h', 'h'],['e','e'],['-','w']];
var S4 = 'these';
var S3_S4 = [['t', 't'],['h', 'h'],['e','e'],['-','s'],['-','e']];
var S4_S3 = [['t', 't'],['h', 'h'],['e','e'],['s','-'],['e','-']];

var S5 = 'kitten';
var S6 = 'sitting';
var S5_S6 = [['k', 's'], ['i','i'], ['t','t'], ['t','t'], ['e', 'i'], ['n','n'], ['-','g']];
var S6_S5 = [['s', 'k'], ['i','i'], ['t','t'], ['t','t'], ['i', 'e'], ['n','n'], ['g','-']];

var S7 = '';
var S8 = 'rsx';
var S7_S8 = [['-', 'r'], ['-', 's'], ['-', 'x']];
var S8_S7 = [['r', '-'], ['s', '-'], ['x', '-']];

var S9 = 'do';
var S10 = 'olethl';
var S9_S10 = [['-', 'o'], ['-', 'l'], ['-', 'e'], ['-', 't'], ['d', 'h'], ['o', 'l'] ];
var S10_S9 = [['o', '-'], ['l', '-'], ['e', '-'], ['t', '-'], ['h', 'd'], ['l', 'o'] ];


var BAD_LIST_EM_EDIT = ['recieve', 'alow', 'qantity', 'agrement', 'ocurrence', 'arleady'];
var CORR_LIST_EM_EDIT = ['receive', 'alow', 'quantity', 'agreement', 'occurrence', 'already'];

var BAD_LIST_LM_EDIT = ['recieve', 'alow', 'qantity', 'agrement', 'ocurrence', 'arleady'];
var CORR_LIST_LM_EDIT = ['believe', 'low', 'quantity', 'agreement', 'currency', 'already'];

var BAD_LIST_SC_EDIT = ['recieve', 'alow', 'qantity', 'agrement', 'ocurrence', 'arleady'];
var CORR_LIST_SC_EDIT = ['receive', 'allow', 'quantity', 'agreement', 'occurrence', 'already'];

describe('edits', function() {
    describe('Edit distance between "' + S1 + '" ==> "' + S2 + '" == ' + 1, function() {
        
        it('should compute edit-distance and alignment for "' + S1 + '" ==> ' + S2 + '"', function() {
            var dist = edits.distanceAligned(S1, S2);
            dist.dist.should.eql(1);
            dist.aligned.should.eql(S1_S2);

            dist = edits.distanceAligned(S2, S1);
            dist.dist.should.eql(1);
            dist.aligned.should.eql(S2_S1);
        });
    });
    describe('Edit distance between "' + S1 + '" ==> "' + S3 + '" == ' + 1, function() {

        it('should compute edit-distance and alignment for "' + S1 + '" ==> "' + S3 + '"', function() {
            var dist = edits.distanceAligned(S1, S3);
            dist.dist.should.eql(1);
            dist.aligned.should.eql(S1_S3);

            dist = edits.distanceAligned(S3, S1);
            dist.dist.should.eql(1);
            dist.aligned.should.eql(S3_S1);

        });
    });

    describe('Edit distance between "' + S3 + '" ==> "' + S4 + '" == ' + 2, function() {

        it('should compute edit-distance and alignment for "' + S3 + '" ==> "' + S4 + '"', function() {
            var dist = edits.distanceAligned(S3, S4);
            dist.dist.should.eql(2);
            dist.aligned.should.eql(S3_S4);
            dist = edits.distanceAligned(S4, S3);
            dist.dist.should.eql(2);
            dist.aligned.should.eql(S4_S3);

        });
    });

    describe('Edit distance between "' + S5 + '" ==> "' + S6 + '" == ' + 3, function() {

        it('should compute edit-distance and alignment for "' + S5 + '" ==> "' + S6 + '"', function() {
            var dist = edits.distanceAligned(S5, S6);
            dist.dist.should.eql(3);
            dist.aligned.should.eql(S5_S6);

            dist = edits.distanceAligned(S5, S6);
            dist.dist.should.eql(3);
            dist.aligned.should.eql(S5_S6);
        });
    });

    describe('Edit distance between "' + S7 + '" ==> "' + S8 + '" == ' + 3, function() {

        it('should compute edit-distance and alignment for "' + S7 + '" ==> "' + S8 + '"', function() {
            var dist = edits.distanceAligned(S7, S8);
            dist.dist.should.eql(3);
            dist.aligned.should.eql(S7_S8);

            dist = edits.distanceAligned(S8, S7);
            dist.dist.should.eql(3);
            dist.aligned.should.eql(S8_S7);
        });
    });

    describe('Edit distance between "' + S9 + '" ==> "' + S10 + '" == ' + 6, function() {

        it('should compute edit-distance and alignment for "' + S9 + '" ==> "' + S10 + '"', function() {
            var dist = edits.distanceAligned(S9, S10);
            dist.dist.should.eql(6);
            dist.aligned.should.eql(S9_S10);

            dist = edits.distanceAligned(S10, S9);
            dist.dist.should.eql(6);
            dist.aligned.should.eql(S10_S9);
        });
    });
});
