class PostsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = Post.all.with_attached_picture

    render json: @posts.map { |post|
      #ternary conditional to define url
      url = post.picture_attached? ? url_for(post.picture) : "@NoPicture";
      post.as_json.merge({ picture: url })
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
      render html: url_for(@post.picture)
      #render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:id, :post_type, :title, :description, :date, :maps_marker, :city, :state, :address1, :address2, :number, :issue_type, :issue_solved, :picture, uploads: [])
    end

    def creation_params
      params.permit(:id, :post_type, :title, :description, :date, :maps_marker, :city, :state, :address1, :address2, :number, :issue_type, :issue_solved, :picture, uploads: [])
    end
end
