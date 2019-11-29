require 'test_helper'

class PartidasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @partida = partidas(:one)
  end

  test "should get index" do
    get partidas_url, as: :json
    assert_response :success
  end

  test "should create partida" do
    assert_difference('Partida.count') do
      post partidas_url, params: { partida: { mandante: @partida.mandante, visitante: @partida.visitante } }, as: :json
    end

    assert_response 201
  end

  test "should show partida" do
    get partida_url(@partida), as: :json
    assert_response :success
  end

  test "should update partida" do
    patch partida_url(@partida), params: { partida: { mandante: @partida.mandante, visitante: @partida.visitante } }, as: :json
    assert_response 200
  end

  test "should destroy partida" do
    assert_difference('Partida.count', -1) do
      delete partida_url(@partida), as: :json
    end

    assert_response 204
  end
end
