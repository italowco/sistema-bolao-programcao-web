require 'test_helper'

class ApostaFolhasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @aposta_folha = aposta_folhas(:one)
  end

  test "should get index" do
    get aposta_folhas_url, as: :json
    assert_response :success
  end

  test "should create aposta_folha" do
    assert_difference('ApostaFolha.count') do
      post aposta_folhas_url, params: { aposta_folha: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show aposta_folha" do
    get aposta_folha_url(@aposta_folha), as: :json
    assert_response :success
  end

  test "should update aposta_folha" do
    patch aposta_folha_url(@aposta_folha), params: { aposta_folha: {  } }, as: :json
    assert_response 200
  end

  test "should destroy aposta_folha" do
    assert_difference('ApostaFolha.count', -1) do
      delete aposta_folha_url(@aposta_folha), as: :json
    end

    assert_response 204
  end
end
