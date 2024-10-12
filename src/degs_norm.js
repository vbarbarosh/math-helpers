/**
 * Convert degrees to value between [0 and 360).
 */
function degs_norm(degs)
{
    let out = degs % 360;
    if (out < 0) {
        out += 360;
    }
    if (out === -0) {
        return 0;
    }
    return out;
}

module.exports = degs_norm;
