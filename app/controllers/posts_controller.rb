class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = Post.all.with_attached_pictures

    #render json: @posts.pictures
    render json: @posts.map { |post|
      #ternary conditional to define url
      urls = post.pictures.map { |photo| url_for(photo) };
      post.as_json.merge({ pictures: urls })
    }
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(creation_params)
    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(update_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    # handle selective purge
    if params[:attachment_id]
      render json: @post.pictures.find(params[:attachment_id])
      @post.pictures.find(params[:attachment_id]).purge
    # handle destroy resource
    else
      @post.destroy
    end
  end

  # ATTACH PICTURES
  def attach_picture
    @post = Post.find(params[:id])
    render json: @post.pictures.attach(params[:file])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def update_params
      params.permit(:id, :post_type, :title, :description, :date, :maps_marker, :city, :state, :address1, :address2, :number, :issue_type, :issue_solved)
    end

    def post_params
      params.require(:post).permit(:id, :post_type, :title, :description, :date, :maps_marker, :city, :state, :address1, :address2, :number, :issue_type, :issue_solved, pictures: [])
    end


    def creation_params
      params.permit(:id, :post_type, :title, :description, :date, :maps_marker, :city, :state, :address1, :address2, :number, :issue_type, :issue_solved, pictures: [])
    end
end
