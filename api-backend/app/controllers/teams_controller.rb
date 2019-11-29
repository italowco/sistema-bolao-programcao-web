class TeamsController < ApplicationController
  #before_action :set_rodada, only: [:show, :update, :destroy]
  #skip_before_action :authenticate_request, only: [:index, :show]
  skip_before_action :authenticate_request

  # GET /rodadas
  def index
    @teams = Team.all

    render json: @teams
  end
end
