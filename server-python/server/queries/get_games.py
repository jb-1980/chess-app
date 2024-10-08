from flask import jsonify, make_response, request
from pydantic import BaseModel
from result import is_ok

from server.domain.game import Game
from server.models.game import GameLoader, make_game_dto


def query_get_games_for_player_id(playerId: str) -> list[Game]:
    gamesResult = GameLoader().get_games_for_player_id(playerId)
    if is_ok(gamesResult):
        games = gamesResult.ok_value
        return [make_game_dto(g) for g in games]
    return []


class Payload(BaseModel):
    playerId: str


def handle_get_games():
    try:
        payload = Payload(**request.json)
    except Exception:
        return make_response(jsonify({"message": "Invalid payload"}), 400)

    games = query_get_games_for_player_id(payload.playerId)
    return make_response(jsonify([game.model_dump() for game in games]), 200)
