'use strict';

function findSingleAlignment(dist, s1, s2) {
    var z = [];
    var M = s1.length;
    var N = s2.length;
    var i = M;
    var j = N;

    var costMax = dist[0][N];
    var costIns;
    var costDel;
    var costSub;

    var currentMin;
    var s1i;
    var s2j;

    
    while (i > 0 || j > 0) {
        costIns = (j <= 0 || i < 0) ? costMax: dist[i][j-1];
        costDel = (i <= 0 || j < 0) ? costMax: dist[i-1][j];
        costSub = (i <= 0 || j <= 0) ? costMax: dist[i-1][j-1];
        currentMin = Math.min(costSub, costIns, costDel);
        
        s1i = (i-1) < 0 ? '-':s1.charAt(i-1);
        s2j = (j-1) < 0 ? '-':s2.charAt(j-1);

        // Substitution (or nothing)
        // Note that b/c of how I structured this, it always prefers
        // substitution over other operations.  This totally makes sense
        // for cases with the same cost, but sometimes is a little odd
        // for cases where there is a deletion or insertion choice
        if (currentMin === costSub) {
            --i;
            --j;
            z.push( [s1i, s2j] );
        }
        // Deletion
        else if (currentMin === costDel) {
            --i;
            z.push([s1i, '-']);
        }
        // Insertion
        else {
            --j;
            z.push(['-', s2j]);
        }
    }

    return z.reverse();
}

function distanceMatrix(s1, s2) {

    var i, j;
    var M = s1.length;
    var N = s2.length;
    var dist = new Array(M+1);
    var del, ins, subst;

    for (i = 0; i <= M; ++i) {
        dist[i] = new Array(N+1);
        dist[i][0] = i;

    }
    for (j = 0; j <= N; ++j) {
        dist[0][j] = j;
    }

    for (i = 1; i <= M; ++i) {
        for (j = 1; j <= N; ++j) {

            if (s1.charAt(i-1) === s2.charAt(j-1)) {
                dist[i][j] = dist[i-1][j-1];
            }
            // Figure out what the transition is
            else {

                del = dist[i-1][j] + 1;
                ins = dist[i][j-1] + 1;
                subst = dist[i-1][j-1] + 1;
                dist[i][j] = Math.min(del, ins, subst);
            }
        }
    }
    return dist;
}

function distance(s1, s2) {
    var M = s1.length;
    var N = s2.length;

    if (M === 0) {
        return N;
    }
    if (N === 0) {
        return M;
    }

    var dist = distanceMatrix(s1, s2);
    return dist[M][N];
}

function distanceAligned(s1, s2) {
    var i, j;
    var M = s1.length;
    var N = s2.length;
    
    if (M === 0) {
        var rightOnly = [];
        for (i = 0; i < s2.length; ++i) {
            rightOnly.push(['-', s2.charAt(i)]);
        }
        return { dist: N, aligned: rightOnly };
    }
    if (N === 0) {
        var leftOnly = [];
        for (i = 0; i < s1.length; ++i) {
            leftOnly.push([s1.charAt(i), '-']);
        }
        return { dist: M, aligned: leftOnly };
    }
    var dist = distanceMatrix(s1, s2);
    return { dist: dist[M][N], aligned: findSingleAlignment(dist, s1, s2)};
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports.distance = distance;
    module.exports.distanceAligned = distanceAligned;
}
