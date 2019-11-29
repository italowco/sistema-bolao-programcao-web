class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  skip_before_action :authenticate_request

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  def index
    @user = User.all
    render json: @user
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private

  def find_user
    @user = User.find_by_email!(params[:_email])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: 'User not found' }, status: :not_found
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(
        :name, :profile, :email, :password, :password_confirmation, :id
    )
  end
end
