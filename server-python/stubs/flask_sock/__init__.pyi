from _typeshed import Incomplete

class Sock:
    app: Incomplete
    bp: Incomplete
    def __init__(self, app: Incomplete | None = None) -> None: ...
    def init_app(self, app) -> None: ...
    def route(self, path, bp: Incomplete | None = None, **kwargs): ...
