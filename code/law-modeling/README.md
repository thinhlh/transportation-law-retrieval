# Migration

To start migration run 2 following commands

```
# Where dev is the name of environment file inside environments folder
alembic -x env=dev revision --autogenerate -m "Message"
alembic -x env=dev upgrade head
```
