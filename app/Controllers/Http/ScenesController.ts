import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Scene from 'App/Models/Scene';
import Play from 'App/Models/Play';


export default class ScenesController {
  public async index ({}: HttpContextContract) {
  }

  public async create ({}: HttpContextContract) {
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({params,view}: HttpContextContract) {
    const sceneInst = await Scene.query()
      .where('id',params.sceneId)
      .preload("lines",(lineQuery)=>{
        lineQuery.orderBy('position', 'asc').preload('character')
      });
    const scene=sceneInst[0].serialize();

    const playId=params.playId;
    const play=await (await Play.findOrFail(playId)).serialize()
    return view.render("scene/show",{scene,play});
  }

  public async createNew({ auth,params }: HttpContextContract) {
    const play=await Play.findOrFail(params.id)
    const user = await auth.authenticate();
    const newPlay=await Scene.create(
      {
        
          name: 'Nouvelle scène',
          position: 2,
          description:"",
          creatorId:user.id,
          playId:play.id
      }
    );
    return newPlay;
  }

  public async updateName ({request, params}: HttpContextContract) {
    const newSceneName=request.all().newSceneName;
    const scene_id=params.sceneId;
    var scene = await Scene.findOrFail(scene_id);
    scene.name=newSceneName;
    console.log(newSceneName);
    await scene.save();
    return scene;
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({request}: HttpContextContract) {
    const scene_id=request.all().sceneId;
    var scene = await Scene.findOrFail(scene_id);
    await scene.delete();
    return "ok";
  }
}
