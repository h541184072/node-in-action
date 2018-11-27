connect_demo
    log中间件
    error中间件

express_generator_demo - listing6_6
    redis
        db.lrange('entries', from, to, (err, items) => {}）
        db.lpush(
              'entries',
              entryJSON,
              (err) => {
                if (err) return cb(err);
                cb();
              }
            );
        db.llen('entries', cb);
        db.incr('user:ids', (err, id) => {}) 保存 incr:增量
        db.set(`user:id:${this.name}`, id, (err) => {
              if (err) return cb(err);
              db.hmset(`user:${id}`, this, (err) => {
                cb(err);
              });
            });
        db.get(`user:id:${name}`, cb);
        db.hgetall(`user:${id}`, (err, user) => {
              if (err) return cb(err);
              cb(null, new User(user));
            });
    debug
        set DEBUG=* & npm start
