class ApostaFolhasController < ApplicationController
  before_action :set_aposta_folha, only: [:show, :update, :destroy]
  skip_before_action :authenticate_request, only: [:index,:show]

  # GET /aposta_folhas
  def index
    @aposta_folhas = ApostaFolha.all
    @aposta_folhas = @aposta_folhas.rodada(params[:rodada]) if params[:rodada].present?

    render json: @aposta_folhas
  end

  # GET /aposta_folhas/1
  def show
    render json: @aposta_folha
  end

  # POST /aposta_folhas
  def create
    @aposta_folha = ApostaFolha.new(aposta_folha_params)

    if @aposta_folha.save
      render json: @aposta_folha, status: :created, location: @aposta_folha
    else
      render json: @aposta_folha.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /aposta_folhas/1
  def update
    if @aposta_folha.update(aposta_folha_params)
      render json: @aposta_folha
    else
      render json: @aposta_folha.errors, status: :unprocessable_entity
    end
  end

  # DELETE /aposta_folhas/1
  def destroy
    @aposta_folha.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_aposta_folha
      @aposta_folha = ApostaFolha.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def aposta_folha_params
      params.require(:aposta_folha).permit(:rodada_id, :numero, :user_id)
    end

    def destroy_bilhetes
      self.bilhetes.destroy_all
    end
end
