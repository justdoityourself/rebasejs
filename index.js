module.exports = {rebaseLinear,rebaseQuadratic,rebasePolynomial,rebase};

/*
    Usage:
        rebaseLinear([...digits as numbers or strings...],target_integer_base,base_of_digit_array)

    Examples:
        rebaseLinear(['1','0','0','0','1'],10,2); // result: [1,7]
        rebaseLinear([1,0,0,0,1],10,2); // result: [1,7]
        rebaseLinear(['f','f','f'],8,16); // result: [7,7,7,7]

    Notes:
        Uses parseInt to interpret string bases, so it shares the limitations of parseInt. ( Only when interpreting the digits as strings ) COULD be fixed...
 */

function rebaseLinear(s,b,sb)
{
    let r = s.reverse();

    if(!sb)sb=10;

    //Interpret string digits.
    for(let i = 0; i < r.length; i ++)
        r[i] = parseInt(''+r[i],sb);

    //Configure Powers: digit *= source_base^digit_degree/target_base^digit_degree;
    let op = 1, tb = 1;
    for(let i = 0; i < r.length; i++,op*=sb,tb*=b)
        r[i] = r[i]*op/tb;

    //Enforce standard form, phase 1: Migrate values left if greater than base. 
    for(let i = 0; i < r.length; i++)
    {
        let d = Math.floor(r[i] / b);
        let m = r[i] % b;

        if(!d) continue;

        r[i] = m;
        r[i+1] = (r[i+1]) ? (r[i+1] + d) : d;
    }

    r.reverse();

    //Enforce standard form, phase 2: Migrate fractional parts right.
    for(let i = 0; i < r.length-1; i++)
    {
        let [w,d] = (''+r[i]).split('.');
        [w,d] = [parseInt(w),(d) ? parseFloat('0.'+d) : 0];

        if(!d) continue;
            
        r[i] = w;
        r[i+1] += d * b;
    }

    //Enforce standard form, Phase 3: remove leading zeros;
    while(r.length && !r[0]) r.shift();

    //Enforce standard form, phase 4: Phase to can cause digit overflow, for the last time move digits left.
    for(let i = r.length-1; i > 0; i--)
    {
        if(r[i] > b)
        {
            r[i-1] += Math.floor(r[i] / b);
            r[i] = r[i] % b;
        }
    }

    return r;
}

function rebaseQuadratic()
{

}

function rebasePolynomial()
{

}

function rebase()
{
    
}