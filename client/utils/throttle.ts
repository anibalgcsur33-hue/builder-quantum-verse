export function throttle<T extends (...a:any)=>void>(fn:T, ms=80):T{
  let t=0, lastArgs:any;
  return function(this:any, ...args:any){
    const now=Date.now(); lastArgs=args;
    if(now-t>=ms){ t=now; fn.apply(this,lastArgs as any); }
  } as T;
}
