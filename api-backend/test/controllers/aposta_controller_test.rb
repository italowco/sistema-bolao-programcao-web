require 'test_helper'

class ApostaControllerTest < ActionDispatch::IntegrationTest
  setup do
    @apostum = aposta(:one)
  end

  test "should get index" do
    get aposta_url, as: :json
    assert_response :success
  end

  test "should create apostum" do
    assert_difference('Apostum.count') do
      post aposta_url, params: { apostum: { bilhete: @apostum.bilhete, partida_id: @apostum.partida_id, resultado: @apostum.resultado, rodada_id: @apostum.rodada_id } }, as: :json
    end

    assert_response 201
  end

  test "should show apostum" do
    get apostum_url(@apostum), as: :json
    assert_response :success
  end

  test "should update apostum" do
    patch apostum_url(@apostum), params: { apostum: { bilhete: @apostum.bilhete, partida_id: @apostum.partida_id, resultado: @apostum.resultado, rodada_id: @apostum.rodada_id } }, as: :json
    assert_response 200
  end

  test "should destroy apostum" do
    assert_difference('Apostum.count', -1) do
      delete apostum_url(@apostum), as: :json
    end

    assert_response 204
  end
end
